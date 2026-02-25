"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrendingUp, DollarSign, Award, PieChart } from "lucide-react"
import { salesOverview } from "@/lib/data"

const revenueByCategory = [
  { category: "Main Course", items: 8, revenue: 43520, percentage: 52 },
  { category: "Starters", items: 5, revenue: 14080, percentage: 17 },
  { category: "Beverages", items: 6, revenue: 10460, percentage: 12 },
  { category: "Desserts", items: 4, revenue: 8400, percentage: 10 },
  { category: "Salads", items: 4, revenue: 4680, percentage: 6 },
  { category: "Soups", items: 3, revenue: 2660, percentage: 3 },
]

export function ReportsPage() {
  const topSelling = [...salesOverview].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Daily Sales Summary</p>
              <p className="text-xl font-bold text-card-foreground mt-0.5">$3,860</p>
              <p className="text-xs font-semibold text-primary mt-0.5">42 orders today</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/10">
              <DollarSign className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Monthly Revenue</p>
              <p className="text-xl font-bold text-card-foreground mt-0.5">$48,520</p>
              <p className="text-xs font-semibold text-chart-2 mt-0.5">+8.2% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-4 w-4 text-primary" />
              </div>
              Top Selling Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSelling.map((item, index) => (
                <div key={item.name} className="flex items-center gap-4 group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
                    <span className="text-xs font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-card-foreground truncate">{item.name}</p>
                      <span className="text-sm font-bold text-primary ml-2">${item.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                      <span className="text-xs text-muted-foreground">{item.quantitySold} sold</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                        style={{
                          width: `${(item.quantitySold / topSelling[0].quantitySold) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <PieChart className="h-4 w-4 text-primary" />
              </div>
              Revenue by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Items</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Revenue</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueByCategory.map((row) => (
                    <TableRow key={row.category} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                      <TableCell className="font-medium text-card-foreground">{row.category}</TableCell>
                      <TableCell className="text-right text-card-foreground">{row.items}</TableCell>
                      <TableCell className="text-right text-primary font-semibold">
                        ${row.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                              style={{ width: `${row.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground w-8 text-right">{row.percentage}%</span>
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
    </div>
  )
}
