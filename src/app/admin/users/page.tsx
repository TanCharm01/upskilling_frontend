"use client"

import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Plus, MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Dummy data for the user table
const users = [
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
    status: "Inactive",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "6",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Student",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "7",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
    role: "Admin",
    joinedDate: "March 3, 2025",
    lastActive: "1 min ago",
  },
  {
    id: "8",
    fullname: "Daisy Kudzai Tsenesa",
    email: "daisy.t@gmail.com",
    status: "Active",
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
]

export default function UserManagement() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">User management</h2>
        </header>

        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Manage all users in one place. Control access, assign roles, monitor activity across you platform
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name..." className="pl-9 w-full" />
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
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-[#0747A1] hover:bg-[#05316e] text-white flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add user
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Fullname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined date</TableHead>
                      <TableHead>Last active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.fullname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Make Admin</DropdownMenuItem>
                              <DropdownMenuItem>Deactivate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <div className="flex items-center justify-between p-4 border-t">
              <Button variant="outline" 
               disabled>
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" 
                 className="bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" 
                >
                  2
                </Button>
                <Button variant="outline" 
                >
                  3
                </Button>
                <span className="text-sm text-muted-foreground">...</span>
                <Button variant="outline" 
                >
                  7
                </Button>
                <Button variant="outline" 
                >
                  8
                </Button>
                <Button variant="outline" 
                >
                  9
                </Button>
              </div>
              <Button variant="outline" 
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
