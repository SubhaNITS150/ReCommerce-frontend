import { useLocation } from "wouter";
import { ArrowLeft, Cpu, AlertTriangle, CheckCircle2, Crosshair, Wrench, ShieldAlert } from "lucide-react";

// Mock data strictly matching your provided AI backend response JSON
const AI_RESPONSE = {
  itemImage: {
    id: "cmqdof02l00010350mb4hczgq",
    itemId: "cmqdnkc110002038wcgecmzdc",
    imageUrl: "https://res.cloudinary.com/doo4sm3vy/image/upload/v1781435021/amazon-hackon/items/tllksw31vqnuz6dizrlw.jpg",
    imageType: "FRONT",
    createdAt: "2026-06-14T11:03:41.853Z"
  },
  inspection: {
    id: "cmqdof1ip00020350fwqquwye",
    itemId: "cmqdnkc110002038wcgecmzdc",
    modelId: "cmqdivl4b000003t01ty1wta4",
    conditionScore: 84.75,
    confidenceScore: 0.3063,
    grade: "C",
    recommendedAction: "REFURBISH",
    safetyStatus: "NEEDS_REVIEW",
    notes: "Detected 4 defects. Total damage percentage: 15.25%",
    createdAt: "2026-06-14T11:03:43.730Z"
  },
  damages: [
    { type: "crack", confidence: 0.3753, bbox: [244.1, 193.4, 402.2, 442.1], damagePercentage: 5.45, grade: "B" },
    { type: "crack", confidence: 0.3114, bbox: [358.9, 391.2, 497.5, 566.3], damagePercentage: 3.36, grade: "A" },
    { type: "crack", confidence: 0.2861, bbox: [241.4, 189.8, 340.6, 436.6], damagePercentage: 3.39, grade: "A" },
    { type: "crack", confidence: 0.2524, bbox: [239.6, 189.3, 335.0, 419.8], damagePercentage: 3.05, grade: "A" }
  ]
};

export default function AIAssessmentResults() {
  const [, setLocation] = useLocation();

  // Extract variables for cleaner JSX
  const { itemImage, inspection, damages } = AI_RESPONSE;

  const getActionColor = (action: string) => {
    switch (action) {
      case "REFURBISH": return "bg-amber-100 text-amber-800 border-amber-300";
      case "RESALE": return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "RECYCLE": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "text-emerald-600";
      case "B": return "text-blue-600";
      case "C": return "text-amber-500";
      case "D":
      case "F": return "text-red-500";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Back Link */}
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors mb-6 cursor-pointer border-0 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            AI Diagnostic Report
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Automated computer-vision analysis complete. Review the grading and recommended logistics routing below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Image & Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Card */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
              <div className="bg-gray-100 p-3 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                <Crosshair className="h-4 w-4" /> Scanned Image
              </div>
              <div className="relative aspect-square bg-gray-900 flex items-center justify-center p-4">
                <img 
                  src={itemImage.imageUrl} 
                  alt="Scanned item" 
                  className="max-h-full max-w-full object-contain rounded shadow-lg ring-1 ring-white/10"
                />
                {/* Simulated scanner overlay graphic */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:100%_20px] opacity-20 pointer-events-none" />
              </div>
            </div>

            {/* AI Model Meta */}
            <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Scan ID:</span>
                <span className="font-mono text-gray-900">{inspection.id.slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Confidence Score:</span>
                <span className="font-bold text-gray-900">{(inspection.confidenceScore * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Safety Status:</span>
                {inspection.safetyStatus === "NEEDS_REVIEW" ? (
                  <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                    <ShieldAlert className="h-3 w-3" /> {inspection.safetyStatus.replace('_', ' ')}
                  </span>
                ) : (
                  <span className="font-bold text-emerald-600">{inspection.safetyStatus}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Score & Damage Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Top Score Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm flex flex-col justify-center items-center text-center">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Condition Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">{inspection.conditionScore}</span>
                  <span className="text-sm font-medium text-gray-400">/ 100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${inspection.conditionScore}%` }} />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Final Grade</p>
                <span className={`text-5xl font-black ${getGradeColor(inspection.grade)}`}>
                  {inspection.grade}
                </span>
              </div>
            </div>

            {/* Routing Action Banner */}
            <div className={`p-4 rounded-md border flex items-center justify-between shadow-sm ${getActionColor(inspection.recommendedAction)}`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">Recommended Routing Action</p>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Wrench className="h-5 w-5" /> {inspection.recommendedAction}
                </h3>
              </div>
              <CheckCircle2 className="h-8 w-8 opacity-50" />
            </div>

            {/* Damages Ledger Table */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Detected Defects Log
                </h3>
                <p className="text-xs text-gray-600 mt-1">{inspection.notes}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white text-gray-500 border-b border-gray-200 text-xs">
                    <tr>
                      <th className="px-4 py-3 font-medium">Defect Type</th>
                      <th className="px-4 py-3 font-medium">Severity (Area %)</th>
                      <th className="px-4 py-3 font-medium">AI Confidence</th>
                      <th className="px-4 py-3 font-medium text-center">Impact Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {damages.map((defect, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900 capitalize flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                          {defect.type}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{defect.damagePercentage}%</td>
                        <td className="px-4 py-3 text-gray-600">{(defect.confidence * 100).toFixed(1)}%</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                            defect.grade === 'A' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            defect.grade === 'B' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            Grade {defect.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setLocation("/")}
                className="px-5 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded shadow-sm transition-colors cursor-pointer"
              >
                Dispute Assessment
              </button>
              <button 
                onClick={() => setLocation("/logistics")}
                className="px-5 py-2 bg-primary hover:bg-accent text-black text-sm font-medium rounded shadow-sm transition-colors cursor-pointer"
              >
                Confirm & Push to Logistics
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}