"use client"

import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Eye, Edit, Check, Loader2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { format } from "date-fns"

export default function AdminDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [adminNote, setAdminNote] = useState("")
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(null) // Track which row is updating
  
  // Define columns for the data table
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.getValue("phone") || "—",
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <Badge className={getSubjectBadgeColor(row.getValue("subject"))}>
          {row.getValue("subject")}
        </Badge>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="max-w-[180px] truncate" title={row.getValue("message")}>
          {row.getValue("message")}
        </div>
      ),
    },
    {
      accessorKey: "adminNotes",
      header: "Notes",
      cell: ({ row }) => {
        const notes = row.getValue("adminNotes")
        if (!notes) return <span className="text-gray-400 italic">No notes</span>
        return (
          <div className="max-w-[180px] truncate" title={notes}>
            {notes}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const contact = row.original
        const isUpdating = updatingStatus === contact._id
        
        return (
          <div className="flex items-center gap-2">
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#F8EE00]" />
            ) : (
              <Select
                value={contact.status || "New"}
                onValueChange={(value) => handleRowStatusChange(contact, value)}
                disabled={isUpdating}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue>
                    <Badge className={getStatusBadgeColor(contact.status || "New")}>
                      {contact.status || "New"}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Responded">Responded</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM d, yyyy h:mm aaa"),
    },
    {
      id: "notes-actions",
      header: "Edit Notes",
      cell: ({ row }) => {
        const contact = row.original
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEditNote(contact)}
            title="Edit notes"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )
      },
    },
  ]
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  })

  // Fetch data from the API
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/dashboard')
      
      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }
      
      const result = await response.json()
      setData(result.contacts || [])
    } catch (error) {
      toast("Error loading contacts , lease try again later")
      
      // For demo purposes if API fails
      const mockContacts = Array.from({ length: 35 }, (_, i) => ({
        id: `id-${i + 1}`,
        _id: `id-${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `+1 (555) ${100 + i}${100 + i}`,
        subject: i % 5 === 0 ? "Program Information" : 
                i % 5 === 1 ? "Enrollment Questions" : 
                i % 5 === 2 ? "Financial Aid" : 
                i % 5 === 3 ? "Facility Tour" : "Other",
        message: `This is a sample message ${i + 1} from a user inquiring about welding programs.`,
        status: i % 3 === 0 ? "New" : i % 3 === 1 ? "Responded" : "Archived",
        adminNotes: i % 5 === 0 ? "Called back on Thursday. Interested in the advanced course. Follow up next week to check enrollment status." : 
                   i % 7 === 0 ? "Left voicemail. Email sent with program details." : "",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
      }))
      
      setData(mockContacts)
    } finally {
      setLoading(false)
    }
  }

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setAdminNote(contact.adminNotes || "")
    setShowDetailModal(true)
  }

  const handleEditNote = (contact) => {
    setSelectedContact(contact)
    setAdminNote(contact.adminNotes || "")
    setShowNoteModal(true)
  }

  const getSubjectBadgeColor = (subject) => {
    switch(subject) {
      case "Program Information":
        return "bg-blue-100 text-blue-800"
      case "Enrollment Questions":
        return "bg-green-100 text-green-800"
      case "Financial Aid":
        return "bg-purple-100 text-purple-800"
      case "Facility Tour":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case "Responded":
        return "bg-green-100 text-green-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-yellow-100 text-yellow-800" // New
    }
  }

  const handleRowStatusChange = async (contact, newStatus) => {
    setUpdatingStatus(contact._id)
    try {
      const response = await fetch(`/api/admin/user/${contact._id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: newStatus,
          // If status is not 'Responded', set respondedAt to null
          respondedAt: newStatus === "Responded" ? new Date().toISOString() : null 
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to update status")
      }
      
      toast(`Contact status updated to ${newStatus}`)
      
      // Update the contact in the local state
      setData(prev => 
        prev.map(item => 
          item._id === contact._id 
            ? { 
                ...item, 
                status: newStatus,
                respondedAt: newStatus === "Responded" ? new Date().toISOString() : null
              } 
            : item
        )
      )
      
      // Update selected contact if it's the one we're viewing
      if (selectedContact && selectedContact._id === contact._id) {
        setSelectedContact(prev => ({ 
          ...prev, 
          status: newStatus,
          respondedAt: newStatus === "Responded" ? new Date().toISOString() : null
        }))
      }
    } catch (error) {
      toast("Error updating status, Please try again later.")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleSaveNote = async () => {
    setIsSavingNote(true)
    try {
      const response = await fetch(`/api/admin/user/${selectedContact._id}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: adminNote })
      })
      
      if (!response.ok) {
        throw new Error("Failed to save note")
      }
      
      toast("Your note has been saved for this User")
      
      // Update the contact in the local state
      setData(prev => 
        prev.map(contact => 
          contact._id === selectedContact._id 
            ? { ...contact, adminNotes: adminNote } 
            : contact
        )
      )
      
      // Update the selected contact
      setSelectedContact(prev => ({ ...prev, adminNotes: adminNote }))
      
      // Close the note modal if it's open
      setShowNoteModal(false)
    } catch (error) {
      toast("Error saving note, Please try again later.")
    } finally {
      setIsSavingNote(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-[#F8EE00] p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">WeldMaster Admin</h1>
              <Badge className="bg-[#F8EE00] text-black hover:bg-[#F8EE00]/90">Dashboard</Badge>
            </div>
            <Button 
              variant="outline" 
              className="border-[#F8EE00] text-[#F8EE00] hover:bg-[#F8EE00]/10"
              onClick={() => window.location.href = "/"}
            >
              Back to Site
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 mt-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Contact Form Submissions</CardTitle>
            <CardDescription>
              Manage and respond to inquiries from potential students.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
              <Input
                placeholder="Search contacts..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-xs focus-visible:ring-[#F8EE00] focus-visible:border-[#F8EE00]"
              />
              
              <div className="flex items-center gap-2">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-300 flex items-center gap-1">
                      Columns <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter(column => column.getCanHide())
                      .map(column => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id === "createdAt" ? "Date" : 
                             column.id === "adminNotes" ? "Notes Content" :
                             column.id === "notes-actions" ? "Edit Notes" : column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button
                  variant="outline"
                  className="border-gray-300"
                  onClick={() => fetchContacts()}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="font-semibold">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin text-[#F8EE00]" />
                          <span className="ml-2">Loading contacts...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No contacts found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-gray-500">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 flex items-center justify-between py-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
              <div>| Go to page:</div>
              <Input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="w-16 h-8"
              />
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              className="p-1 border rounded text-sm"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </CardFooter>
        </Card>
      </main>
      
      {/* Note Edit Modal */}
      {selectedContact && (
        <Dialog open={showNoteModal} onOpenChange={setShowNoteModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Edit Notes</DialogTitle>
              <DialogDescription>
                For contact: {selectedContact.name} ({selectedContact.email})
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-2">
              <Textarea 
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add notes about this contact (visible to admins only)"
                className="min-h-[150px] border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            
            <DialogFooter className="flex gap-3 justify-end mt-4">
              <Button 
                variant="outline" 
                className="border-gray-300"
                onClick={() => setShowNoteModal(false)}
                disabled={isSavingNote}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#F8EE00] text-black hover:bg-[#F8EE00]/90"
                onClick={handleSaveNote}
                disabled={isSavingNote}
              >
                {isSavingNote ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Save Note
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Contact Detail Modal */}
      {selectedContact && (
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-1">Contact Details</DialogTitle>
              <DialogDescription>
                Submitted on {format(new Date(selectedContact.createdAt), "MMMM d, yyyy 'at' h:mm aaa")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-black">{selectedContact.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                <Badge className={`mt-1 ${getSubjectBadgeColor(selectedContact.subject)}`}>
                  {selectedContact.subject}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-black">{selectedContact.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="text-black">{selectedContact.phone || "—"}</p>
              </div>
            </div>
            
            {/* Status management section */}
            <div className="mb-4 p-3 bg-gray-50 rounded-md border">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status Management</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium mr-2">Current Status:</span>
                    <Badge className={getStatusBadgeColor(selectedContact.status || "New")}>
                      {selectedContact.status || "New"}
                    </Badge>
                  </div>
                  {selectedContact.respondedAt && (
                    <div className="text-sm text-gray-500">
                      Responded: {format(new Date(selectedContact.respondedAt), "MMM d, yyyy h:mm aaa")}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 items-center">
                  <Select
                    value={selectedContact.status || "New"}
                    onValueChange={(value) => handleRowStatusChange(selectedContact, value)}
                    disabled={updatingStatus === selectedContact._id}
                    modal={false}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Responded">Responded</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
              <div className="border rounded-md p-3 bg-gray-50 max-h-[120px] overflow-y-auto">
                <p className="text-black whitespace-pre-line">{selectedContact.message}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium text-gray-500">Admin Notes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => {
                    setShowDetailModal(false)
                    setTimeout(() => setShowNoteModal(true), 100)
                  }}
                >
                  Edit Notes
                </Button>
              </div>
              <div className="border rounded-md p-3 bg-gray-50 min-h-[80px]">
                {selectedContact.adminNotes ? (
                  <p className="text-black whitespace-pre-line">{selectedContact.adminNotes}</p>
                ) : (
                  <p className="text-gray-400 italic">No notes available</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                className="border-gray-300"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </Button>
              <Button 
                className="bg-[#F8EE00] text-black hover:bg-[#F8EE00]/90"
                onClick={() => window.location.href = `mailto:${selectedContact.email}`}
              >
                Reply via Email
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}