"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { users as initialUsers, type User } from "@/lib/data"
import { Pencil, Trash2, Plus, UserPlus } from "lucide-react"

export function UsersPage() {
  const [usersList, setUsersList] = useState<User[]>(initialUsers)
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "" as "" | "Admin" | "Billing",
    password: "",
  })

  const addUser = () => {
    if (!form.name.trim() || !form.email.trim() || !form.role || !form.password) return
    const newUser: User = {
      id: String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role as "Admin" | "Billing",
      status: "Active",
    }
    setUsersList([...usersList, newUser])
    setForm({ name: "", email: "", role: "", password: "" })
  }

  const deleteUser = (id: string) => setUsersList(usersList.filter((u) => u.id !== id))

  const toggleStatus = (id: string) => {
    setUsersList(
      usersList.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    )
  }

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <UserPlus className="h-4 w-4 text-primary" />
            </div>
            Add User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Full Name</Label>
              <Input
                placeholder="Enter full name..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Email</Label>
              <Input
                type="email"
                placeholder="Enter email..."
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v as "Admin" | "Billing" })}
              >
                <SelectTrigger className="h-11 bg-input border-border text-foreground">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Admin" className="text-popover-foreground">Admin</SelectItem>
                  <SelectItem value="Billing" className="text-popover-foreground">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Password</Label>
              <Input
                type="password"
                placeholder="Enter password..."
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <Button
            onClick={addUser}
            className="mt-6 h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">
            All Users ({usersList.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Name</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Email</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Role</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersList.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                    <TableCell className="font-medium text-card-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium ${
                          user.role === "Admin"
                            ? "border-primary/30 text-primary bg-primary/5"
                            : "border-chart-2/30 text-chart-2 bg-chart-2/5"
                        }`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => toggleStatus(user.id)}>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium cursor-pointer transition-all duration-200 ${
                            user.status === "Active"
                              ? "border-chart-4/30 text-chart-4 bg-chart-4/5 hover:bg-chart-4/10"
                              : "border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10"
                          }`}
                        >
                          {user.status}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit {user.name}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-200"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete {user.name}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
