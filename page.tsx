"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Building2,
  AlertTriangle,
  Shield,
  FileText,
  Search,
  Plus,
  TrendingUp,
  Bell,
  Edit,
  Trash2,
  Calendar,
  User,
  HardHat,
} from "lucide-react"

interface Company {
  id: number
  name: string
  contractStartDate: string
  contractDescription: string
  projectManager: string
  workshopSupervisor: string
  hseManager: string
  projectName: string
  projectDescription: string
  status: "فعال" | "غیرفعال" | "تعلیق"
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "شرکت پتروشیمی البرز",
      contractStartDate: "1403/01/15",
      contractDescription: "قرارداد نگهداری و تعمیرات تجهیزات پتروشیمی",
      projectManager: "مهندس احمد رضایی",
      workshopSupervisor: "علی محمدی",
      hseManager: "فاطمه احمدی",
      projectName: "پروژه نگهداری واحد اتیلن",
      projectDescription: "نگهداری و تعمیرات دوره‌ای تجهیزات واحد تولید اتیلن",
      status: "فعال",
    },
    {
      id: 2,
      name: "کارخانه فولاد مبارکه",
      contractStartDate: "1403/03/10",
      contractDescription: "قرارداد خدمات ایمنی و بهداشت کار",
      projectManager: "مهندس سارا کریمی",
      workshopSupervisor: "حسن علوی",
      hseManager: "مریم صادقی",
      projectName: "پروژه ایمنی کارگاه فولاد",
      projectDescription: "پیاده‌سازی استانداردهای ایمنی و نظارت بر عملیات",
      status: "فعال",
    },
  ])
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [newCompany, setNewCompany] = useState<Omit<Company, "id">>({
    name: "",
    contractStartDate: "",
    contractDescription: "",
    projectManager: "",
    workshopSupervisor: "",
    hseManager: "",
    projectName: "",
    projectDescription: "",
    status: "فعال",
  })

  const handleAddCompany = () => {
    if (newCompany.name && newCompany.projectName) {
      const company: Company = {
        ...newCompany,
        id: Math.max(...companies.map((c) => c.id), 0) + 1,
      }
      setCompanies([...companies, company])
      setNewCompany({
        name: "",
        contractStartDate: "",
        contractDescription: "",
        projectManager: "",
        workshopSupervisor: "",
        hseManager: "",
        projectName: "",
        projectDescription: "",
        status: "فعال",
      })
      setIsAddCompanyOpen(false)
    }
  }

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company)
    setNewCompany(company)
    setIsAddCompanyOpen(true)
  }

  const handleUpdateCompany = () => {
    if (editingCompany && newCompany.name && newCompany.projectName) {
      setCompanies(companies.map((c) => (c.id === editingCompany.id ? { ...newCompany, id: editingCompany.id } : c)))
      setEditingCompany(null)
      setNewCompany({
        name: "",
        contractStartDate: "",
        contractDescription: "",
        projectManager: "",
        workshopSupervisor: "",
        hseManager: "",
        projectName: "",
        projectDescription: "",
        status: "فعال",
      })
      setIsAddCompanyOpen(false)
    }
  }

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter((c) => c.id !== id))
  }

  const stats = [
    {
      title: "شرکت‌های فعال",
      value: companies.filter((c) => c.status === "فعال").length.toString(),
      icon: Building2,
      color: "text-primary",
    },
    { title: "حوادث این ماه", value: "8", icon: AlertTriangle, color: "text-destructive" },
    { title: "بیمه‌نامه‌های فعال", value: "18", icon: Shield, color: "text-secondary" },
    { title: "گزارش‌های تولید شده", value: "156", icon: FileText, color: "text-accent" },
  ]

  const recentIncidents = [
    { id: 1, company: "شرکت پتروشیمی البرز", type: "جزئی", date: "1403/08/15", employee: "احمد محمدی" },
    { id: 2, company: "کارخانه فولاد مبارکه", type: "متوسط", date: "1403/08/14", employee: "فاطمه احمدی" },
    { id: 3, company: "شرکت نفت پارس", type: "جزئی", date: "1403/08/13", employee: "علی رضایی" },
  ]

  const expiringInsurance = [
    { company: "شرکت پتروشیمی البرز", expiryDate: "1403/09/05", daysLeft: 12 },
    { company: "کارخانه سیمان تهران", expiryDate: "1403/09/08", daysLeft: 9 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-space-grotesk text-foreground">سیستم مدیریت شرکت‌ها</h1>
                <p className="text-sm text-muted-foreground">مدیریت جامع رویدادها و حوادث</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="جستجو در سیستم..." className="pr-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              {activeSection === "companies" ? (
                <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingCompany(null)}>
                      <Plus className="w-4 h-4 ml-2" />
                      افزودن شرکت
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingCompany ? "ویرایش شرکت" : "افزودن شرکت جدید"}</DialogTitle>
                      <DialogDescription>اطلاعات کامل شرکت و پروژه را وارد کنید</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">نام شرکت *</Label>
                        <Input
                          id="name"
                          value={newCompany.name}
                          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                          placeholder="نام شرکت را وارد کنید"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contractStartDate">تاریخ شروع قرارداد</Label>
                        <Input
                          id="contractStartDate"
                          value={newCompany.contractStartDate}
                          onChange={(e) => setNewCompany({ ...newCompany, contractStartDate: e.target.value })}
                          placeholder="1403/01/01"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="contractDescription">شرح قرارداد</Label>
                        <Textarea
                          id="contractDescription"
                          value={newCompany.contractDescription}
                          onChange={(e) => setNewCompany({ ...newCompany, contractDescription: e.target.value })}
                          placeholder="توضیحات کامل قرارداد"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectManager">نام مدیر پروژه</Label>
                        <Input
                          id="projectManager"
                          value={newCompany.projectManager}
                          onChange={(e) => setNewCompany({ ...newCompany, projectManager: e.target.value })}
                          placeholder="نام مدیر پروژه"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workshopSupervisor">نام سرپرست کارگاه</Label>
                        <Input
                          id="workshopSupervisor"
                          value={newCompany.workshopSupervisor}
                          onChange={(e) => setNewCompany({ ...newCompany, workshopSupervisor: e.target.value })}
                          placeholder="نام سرپرست کارگاه"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hseManager">نام مسئول HSE</Label>
                        <Input
                          id="hseManager"
                          value={newCompany.hseManager}
                          onChange={(e) => setNewCompany({ ...newCompany, hseManager: e.target.value })}
                          placeholder="نام مسئول ایمنی"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectName">نام پروژه *</Label>
                        <Input
                          id="projectName"
                          value={newCompany.projectName}
                          onChange={(e) => setNewCompany({ ...newCompany, projectName: e.target.value })}
                          placeholder="نام پروژه"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="projectDescription">شرح کلی فعالیت پروژه</Label>
                        <Textarea
                          id="projectDescription"
                          value={newCompany.projectDescription}
                          onChange={(e) => setNewCompany({ ...newCompany, projectDescription: e.target.value })}
                          placeholder="توضیحات کامل فعالیت‌های پروژه"
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddCompanyOpen(false)}>
                        انصراف
                      </Button>
                      <Button onClick={editingCompany ? handleUpdateCompany : handleAddCompany}>
                        {editingCompany ? "به‌روزرسانی" : "افزودن شرکت"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن جدید
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {[
              { id: "dashboard", label: "داشبورد", icon: TrendingUp },
              { id: "companies", label: "شرکت‌ها", icon: Building2 },
              { id: "incidents", label: "حوادث", icon: AlertTriangle },
              { id: "insurance", label: "بیمه‌نامه‌ها", icon: Shield },
              { id: "reports", label: "گزارش‌ها", icon: FileText },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeSection === item.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeSection === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold font-space-grotesk">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    حوادث اخیر
                  </CardTitle>
                  <CardDescription>آخرین حوادث ثبت شده در سیستم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentIncidents.map((incident) => (
                      <div key={incident.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{incident.company}</p>
                          <p className="text-xs text-muted-foreground">{incident.employee}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={incident.type === "جزئی" ? "secondary" : "destructive"}>
                            {incident.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{incident.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Expiry Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    هشدار انقضای بیمه‌نامه
                  </CardTitle>
                  <CardDescription>بیمه‌نامه‌هایی که به زودی منقضی می‌شوند</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringInsurance.map((insurance, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{insurance.company}</p>
                          <p className="text-xs text-muted-foreground">انقضا: {insurance.expiryDate}</p>
                        </div>
                        <Badge variant="destructive">{insurance.daysLeft} روز باقی‌مانده</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "companies" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-space-grotesk">مدیریت شرکت‌ها</h2>
                <p className="text-muted-foreground">مدیریت اطلاعات شرکت‌ها و پروژه‌ها</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {companies.length} شرکت
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <CardDescription className="mt-1">{company.projectName}</CardDescription>
                      </div>
                      <Badge variant={company.status === "فعال" ? "default" : "secondary"}>{company.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">شروع قرارداد:</span>
                        <span>{company.contractStartDate || "تعریف نشده"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">مدیر پروژه:</span>
                        <span>{company.projectManager || "تعریف نشده"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <HardHat className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">مسئول HSE:</span>
                        <span>{company.hseManager || "تعریف نشده"}</span>
                      </div>
                    </div>

                    {company.projectDescription && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-muted-foreground line-clamp-2">{company.projectDescription}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditCompany(company)} className="flex-1">
                        <Edit className="w-4 h-4 ml-1" />
                        ویرایش
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCompany(company.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {companies.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">هیچ شرکتی ثبت نشده</h3>
                <p className="text-muted-foreground mb-4">برای شروع، اولین شرکت خود را اضافه کنید</p>
                <Button onClick={() => setIsAddCompanyOpen(true)}>
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن شرکت جدید
                </Button>
              </div>
            )}
          </div>
        )}

        {activeSection !== "dashboard" && activeSection !== "companies" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">بخش {activeSection} در حال توسعه</h3>
            <p className="text-muted-foreground">این بخش در مراحل بعدی پیاده‌سازی خواهد شد.</p>
          </div>
        )}
      </main>
    </div>
  )
}
