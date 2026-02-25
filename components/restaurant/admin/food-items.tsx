"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { foodItems as initialItems, categories, type FoodItem } from "@/lib/data"
import { Pencil, Trash2, Plus, ImageIcon } from "lucide-react"

export function FoodItemsPage() {
  const [items, setItems] = useState<FoodItem[]>(initialItems)
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    available: true,
    description: "",
  })

  const addItem = () => {
    if (!form.name.trim() || !form.price || !form.category) return
    const newItem: FoodItem = {
      id: String(Date.now()),
      name: form.name.trim(),
      price: parseFloat(form.price),
      category: form.category,
      available: form.available,
      description: form.description,
      image: "/placeholder.svg",
    }
    setItems([...items, newItem])
    setForm({ name: "", price: "", category: "", available: true, description: "" })
  }

  const deleteItem = (id: string) => setItems(items.filter((i) => i.id !== id))

  const toggleAvailability = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, available: !i.available } : i)))
  }

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">Add Food Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Food Name</Label>
              <Input
                placeholder="Enter food name..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Price</Label>
              <Input
                type="number"
                placeholder="Enter price..."
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="h-11 bg-input border-border text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name} className="text-popover-foreground">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-xs font-medium text-muted-foreground">Description</Label>
              <Textarea
                placeholder="Description (optional)..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                rows={2}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.available}
                  onCheckedChange={(v) => setForm({ ...form, available: v })}
                />
                <Label className="text-sm text-foreground font-medium">
                  {form.available ? "Available" : "Out of Stock"}
                </Label>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                <ImageIcon className="h-4 w-4" />
                <span className="text-xs font-medium">Upload Image</span>
              </div>
            </div>
          </div>
          <Button
            onClick={addItem}
            className="mt-6 h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Food Item
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">
            All Food Items ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Image</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Name</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Category</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Price</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                    <TableCell>
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                        <UtensilsIcon className="h-4 w-4 text-primary/50" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-card-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground font-normal">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-card-foreground">${item.price}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleAvailability(item.id)}>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium cursor-pointer transition-all duration-200 ${
                            item.available
                              ? "border-primary/30 text-primary bg-primary/5 hover:bg-primary/10"
                              : "border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10"
                          }`}
                        >
                          {item.available ? "Available" : "Out of Stock"}
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
                          <span className="sr-only">Edit {item.name}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-200"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete {item.name}</span>
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

function UtensilsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
