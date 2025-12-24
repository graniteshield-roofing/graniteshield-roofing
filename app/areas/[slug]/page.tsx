import Link from 'next/link';
/>


<section className="px-6 py-12 max-w-6xl mx-auto space-y-12">
<div className="space-y-6">
<h1 className="text-4xl font-bold text-slate-900">
{config?.title || `Roofing & Exteriors in ${town.name}, ME`}
</h1>
<p className="text-lg text-slate-700 max-w-3xl">
{config?.intro || `GraniteShield proudly serves ${town.name} with full roofing and exterior upgrades.`}
</p>


<div className="flex flex-col sm:flex-row gap-4 pt-4">
<Button size="lg" asChild>
<Link href="/lp">Get Free Estimate <ArrowRight className="ml-2 h-4 w-4" /></Link>
</Button>
<Button size="lg" variant="outline" asChild>
<a href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}>
<Phone className="mr-2 h-5 w-5" />
{BUSINESS_CONFIG.contact.phone}
</a>
</Button>
</div>
</div>


{/* DATA + CODES */}
{config && (
<div className="grid md:grid-cols-2 gap-8">
<Card>
<CardHeader>
<CardTitle className="flex items-center gap-2">
<Ruler className="h-5 w-5 text-blue-600" />
{town.name} Climate & Code
</CardTitle>
</CardHeader>
<CardContent className="p-0">
<table className="w-full text-sm">
<thead className="border-b">
<tr>
<th className="p-4">Factor</th>
<th className="p-4">Code</th>
<th className="p-4">Our Standard</th>
</tr>
</thead>
<tbody>
{config.climateTable.map((row, i) => (
<tr key={i} className="border-b">
<td className="p-4 font-medium">{row.factor}</td>
<td className="p-4">{row.req}</td>
<td className="p-4 text-green-700 font-semibold flex items-center gap-2">
<CheckCircle2 className="h-4 w-4" />
{row.standard}
</td>
</tr>
))}
</tbody>
</table>
</CardContent>
</Card>


<Card>
<CardHeader>
<CardTitle className="flex items-center gap-2">
<ShieldCheck className="h-5 w-5 text-blue-600" />
Local Permit Info
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<div className="flex items-start gap-3">
<MapPin className="h-5 w-5 text-blue-600 mt-1" />
<div>
<p className="font-semibold">Permit Office</p>
<p className="text-slate-600">{config.permitOffice}</p>
</div>
</div>
<div className="flex items-start gap-3">
<FileText className="h-5 w-5 text-blue-600 mt-1" />
<p className="text-slate-600">
Projects in {town.name} must comply with <strong>{config.highlight}</strong>.
GraniteShield handles all permitting and inspections.
</p>
</div>
</CardContent>
</Card>
</div>
)}
</section>
</>
);
}
