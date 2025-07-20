"use client" // This page needs to be a client component to use useState for the dialog

import { useState } from "react"
import AdminSidebar from "@/components/admin_sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog" // Import Dialog components
import { Search, ChevronDown, Plus, MoreHorizontal, ArrowLeft, ArrowRight, X } from "lucide-react" // Import X for close button
import { cn } from "@/lib/utils"

const usersData = [
  {
    id: "1",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Admin",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "2",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Admin",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "3",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Admin",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "4",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "5",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "6",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Inactive",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "7",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "8",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Inactive",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "9",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "10",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "11",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
]

export default function UserManagementPage() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false) // State to control modal visibility

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="p-6 bg-white border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-600">
            Manage all users in one place. Control access, assign roles, monitor activity across you platform
          </p>
        </header>

        {/* User Management Content */}
        <main className="flex-grow p-6 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by name..."
                  className="pl-10 pr-4 py-2 rounded-md border w-full"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      Role <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Admin</DropdownMenuItem>
                    <DropdownMenuItem>Student</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      Status <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      Date <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>All time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Add User Dialog Trigger */}
                <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-4 py-2 rounded-md flex items-center">
                      <Plus className="h-5 w-5 mr-2" /> Add user
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Add new user</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Please provide information to create a new user.
                      </DialogDescription>
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                      </DialogClose>
                    </DialogHeader>
                    <form className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                          Full name
                        </label>
                        <Input id="fullName" placeholder="John Doe" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="name@company.com" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <Input id="role" placeholder="Admin" /> {/* This could be a dropdown in a real app */}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-loginPurple-DEFAULT hover:bg-loginPurple-dark text-white py-2 rounded-md mt-4"
                      >
                        Add user
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Users Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fullname</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined date</TableHead>
                  <TableHead>Last active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-block h-2 w-2 rounded-full mr-2",
                          user.status === "Active" ? "bg-green-500" : "bg-red-500",
                        )}
                      />
                      {user.status}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View user</DropdownMenuItem>
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                          <DropdownMenuItem>Delete user</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">
                7
              </Button>
              <Button variant="outline" size="sm">
                8
              </Button>
              <Button variant="outline" size="sm">
                9
              </Button>
              <Button variant="outline" size="sm">
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
