"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { categories as initialCategories, type Category } from "@/lib/data"
import { Pencil, Trash2, Plus, Check, X } from "lucide-react"

export function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>(initialCategories)
  const [newCat, setNewCat] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const addCategory = () => {
    if (!newCat.trim()) return
    const newItem: Category = { id: String(Date.now()), name: newCat.trim(), itemCount: 0 }
    setCats([...cats, newItem])
    setNewCat("")
  }

  const deleteCategory = (id: string) => setCats(cats.filter((c) => c.id !== id))

  const startEdit = (cat: Category) => {
    setEditId(cat.id)
    setEditName(cat.name)
  }

  const saveEdit = () => {
    if (!editId || !editName.trim()) return
    setCats(cats.map((c) => (c.id === editId ? { ...c, name: editName.trim() } : c)))
    setEditId(null)
    setEditName("")
  }

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Category name..."
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              className="sm:max-w-sm h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <Button
              onClick={addCategory}
              className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">
            All Categories ({cats.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Category Name</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Food Items</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cats.map((cat) => (
                  <TableRow key={cat.id} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                    <TableCell>
                      {editId === cat.id ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                            className="h-9 max-w-[200px] bg-input border-border text-foreground"
                            autoFocus
                          />
                          <Button
                            size="icon"
                            onClick={saveEdit}
                            className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-200"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Save</span>
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setEditId(null)}
                            className="h-9 w-9 border-border text-muted-foreground hover:bg-secondary transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        </div>
                      ) : (
                        <span className="font-medium text-card-foreground">{cat.name}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-card-foreground font-medium">{cat.itemCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                          onClick={() => startEdit(cat)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit {cat.name}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-200"
                          onClick={() => deleteCategory(cat.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete {cat.name}</span>
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
