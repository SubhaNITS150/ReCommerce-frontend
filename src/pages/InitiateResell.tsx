// import { useState, useRef } from "react";
// import { useLocation } from "wouter";
// import { ArrowLeft, Zap, ShieldCheck, AlertCircle, HelpCircle, UploadCloud, FileImage, X, Coins } from "lucide-react";
// import { toast } from "sonner";

// export default function InitiateResell() {
//   const [, setLocation] = useLocation();
//   const [orderId, setOrderId] = useState("");
//   const [resellPrice, setResellPrice] = useState("");
//   const [conditionGrade, setConditionGrade] = useState("");
//   const [description, setDescription] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Image Upload Pipeline States
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageChange = (file: File) => {
//     if (!file.type.startsWith("image/")) {
//       toast.error("Invalid file format. Please drop a valid image file (PNG, JPG, JPEG).");
//       return;
//     }
//     setSelectedImage(file);
//     setImagePreview(URL.createObjectURL(file));
//     toast.info(`Item photo attached: ${file.name}`);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImageChange(e.dataTransfer.files[0]);
//     }
//   };

//   const removeImage = () => {
//     setSelectedImage(null);
//     if (imagePreview) URL.revokeObjectURL(imagePreview);
//     setImagePreview(null);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!orderId || !resellPrice || !conditionGrade) {
//       toast.error("Please fill in all mandatory listing fields.");
//       return;
//     }

//     setIsSubmitting(true);
//     toast.loading("Publishing verification parameters to ReCommerce P2P network layer...", { id: "resell-pipeline" });

//     setTimeout(() => {
//       toast.loading("Analyzing attached photo matching computer-vision parameters...", { id: "resell-pipeline" });

//       setTimeout(() => {
//         setIsSubmitting(false);
//         toast.dismiss("resell-pipeline");
//         toast.success("Listing Active! Item published to the Marketplace live exchange.", { duration: 4000 });
//         setLocation("/marketplace"); // Takes them directly to view listings
//       }, 1500);
//     }, 1200);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
//       <div className="max-w-3xl mx-auto">
        
//         {/* Back Link Nav Control */}
//         <button 
//           onClick={() => setLocation("/home")}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors mb-6 cursor-pointer border-0 bg-transparent"
//         >
//           <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
//           Back to Dashboard
//         </button>

//         {/* Form Page Header */}
//         <div className="bg-white p-6 rounded-t-md border border-b-0 border-gray-200">
//           <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
//             <Coins className="h-6 w-6 text-amber-500" />
//             List Item for Resell
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Provide your item specifics below to generate your automated circular peer-to-peer marketplace listing.
//           </p>
//         </div>

//         {/* Contextual Value Metric Banner */}
//         <div className="bg-emerald-50 border-x border-emerald-200 p-4 flex items-start gap-3">
//           <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
//           <div className="text-xs text-emerald-800 leading-normal">
//             <span className="font-bold">Eco-Listing Program Enabled:</span> By listing items directly on our resale exchange, you preserve circular value loops. Completed listings bypass traditional scrap centers, unlocking high <strong className="text-emerald-700">Green Credits (GC)</strong> bonuses automatically!
//           </div>
//         </div>

//         {/* Interactive Workspace Form Area */}
//         <div className="bg-white p-6 rounded-b-md border border-gray-200 shadow-sm">
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Row Layout: Order ID & Desired Resell Price */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="orderId" className="block text-sm font-bold text-gray-700 mb-1">
//                   Original Order / Invoice Reference <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="orderId"
//                   type="text"
//                   required
//                   placeholder="e.g., ORD-2026-9912A"
//                   value={orderId}
//                   onChange={(e) => setOrderId(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm h-10"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">
//                   Target Resell Price (₹) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="price"
//                   type="number"
//                   required
//                   placeholder="Enter asking price amount"
//                   value={resellPrice}
//                   onChange={(e) => setResellPrice(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm h-10"
//                 />
//               </div>
//             </div>

//             {/* Condition Evaluation Dropdown Selector */}
//             <div>
//               <label htmlFor="conditionGrade" className="block text-sm font-bold text-gray-700 mb-1">
//                 Self-Assessed Item Condition <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="conditionGrade"
//                 required
//                 value={conditionGrade}
//                 onChange={(e) => setConditionGrade(e.target.value)}
//                 className="w-full max-w-md px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm cursor-pointer h-10"
//               >
//                 <option value="">Select condition grade profile...</option>
//                 <option value="Like New">Like New (Perfect operational state, minimal box cosmetic wear)</option>
//                 <option value="Good">Good (Minor surface scuffs/scratches, fully functional)</option>
//                 <option value="Fair">Fair (Noticeable cosmetic marks, works perfectly)</option>
//               </select>
//             </div>

//             {/* DRAG AND DROP FILE COMPONENT PIECE */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-1">
//                 Upload Product Verification Image <span className="text-gray-400 font-normal text-xs">(Highly Recommended)</span>
//               </label>
//               <p className="text-xs text-gray-400 mb-2">Provide a crisp image of the physical asset to compute its verified AI alignment score index metric.</p>
              
//               <input 
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 accept="image/*"
//                 onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
//               />

//               {!imagePreview ? (
//                 <div
//                   onDragOver={handleDragOver}
//                   onDragLeave={() => setIsDragging(false)}
//                   onDrop={handleDrop}
//                   onClick={() => fileInputRef.current?.click()}
//                   className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors max-w-md ${
//                     isDragging ? "border-amber-500 bg-orange-50/50" : "border-gray-300 bg-gray-50 hover:bg-gray-100/70"
//                   }`}
//                 >
//                   <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
//                   <p className="text-sm font-medium text-gray-700">Drag & drop your product photo here, or <span className="text-amber-600 underline">browse files</span></p>
//                   <p className="text-[11px] text-gray-400 mt-1">Supports PNG, JPG, JPEG formats</p>
//                 </div>
//               ) : (
//                 <div className="relative border border-gray-200 rounded-lg p-3 max-w-md bg-gray-50 flex items-center gap-3">
//                   <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center shrink-0 border border-gray-300">
//                     <img src={imagePreview} alt="Resell asset snapshot" className="h-full w-full object-cover" />
//                   </div>
//                   <div className="flex-1 min-w-0 text-xs">
//                     <p className="font-bold text-gray-800 truncate flex items-center gap-1">
//                       <FileImage className="h-3.5 w-3.5 text-amber-600" />
//                       {selectedImage?.name}
//                     </p>
//                     <p className="text-gray-400 mt-0.5">Size: {((selectedImage?.size || 0) / (1024 * 1024)).toFixed(2)} MB</p>
//                     <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
//                       Ready for listing check
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute -top-2 -right-2 bg-gray-900 text-white p-1 rounded-full hover:bg-red-600 transition-colors cursor-pointer border-0 shadow"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Description Textarea Field */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
//                 Item Condition Note / Functional Description <span className="text-xs font-normal text-gray-400">(Optional)</span>
//                 <span className="group relative text-gray-400 hover:text-gray-600 cursor-help">
//                   <HelpCircle className="h-4 w-4" />
//                   <span className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white font-normal text-[11px] p-2 rounded shadow w-48 z-10 leading-normal">
//                     Assists potential direct circular ecosystem buyers in browsing your offer parameters.
//                   </span>
//                 </span>
//               </label>
//               <textarea
//                 id="description"
//                 rows={3}
//                 placeholder="Detail current accessory contents, micro scratches, packaging presence attributes, etc."
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>

//             <hr className="border-gray-200" />

//             {/* Bottom Footer Actions block */}
//             <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center gap-1.5 text-xs text-gray-500">
//                 <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
//                 Next Step: Instant peer-to-peer verification match matching index tracking logic layer.
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-2 rounded shadow-sm text-sm border border-amber-600/20 cursor-pointer select-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? "Publishing Active..." : "Publish Resell Listing"}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ShieldCheck, AlertCircle, HelpCircle, UploadCloud, FileImage, X, Coins } from "lucide-react";
import { toast } from "sonner";

export default function InitiateResell() {
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState("");
  const [resellPrice, setResellPrice] = useState("");
  const [conditionGrade, setConditionGrade] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Image Upload Pipeline States
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file format. Please drop a valid image file (PNG, JPG, JPEG).");
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    toast.info(`Item photo attached: ${file.name}`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !resellPrice || !conditionGrade) {
      toast.error("Please fill in all mandatory listing fields.");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Publishing verification parameters to ReCommerce P2P network layer...", { id: "resell-pipeline" });

    setTimeout(() => {
      toast.loading("Analyzing attached photo matching computer-vision parameters...", { id: "resell-pipeline" });

      setTimeout(() => {
        setIsSubmitting(false);
        toast.dismiss("resell-pipeline");
        toast.success("Image processed! Redirecting to AI Diagnostic Results...", { duration: 3000 });
        
        // FIXED: Now routes to the AI Assessment Results screen
        setLocation("/ai-results"); 
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link Nav Control */}
        <button 
          onClick={() => setLocation("/home")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors mb-6 cursor-pointer border-0 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>

        {/* Form Page Header */}
        <div className="bg-white p-6 rounded-t-md border border-b-0 border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Coins className="h-6 w-6 text-amber-500" />
            List Item for Resell
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Provide your item specifics below to generate your automated circular peer-to-peer marketplace listing.
          </p>
        </div>

        {/* Contextual Value Metric Banner */}
        <div className="bg-emerald-50 border-x border-emerald-200 p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-800 leading-normal">
            <span className="font-bold">Eco-Listing Program Enabled:</span> By listing items directly on our resale exchange, you preserve circular value loops. Completed listings bypass traditional scrap centers, unlocking high <strong className="text-emerald-700">Green Credits (GC)</strong> bonuses automatically!
          </div>
        </div>

        {/* Interactive Workspace Form Area */}
        <div className="bg-white p-6 rounded-b-md border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row Layout: Order ID & Desired Resell Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-bold text-gray-700 mb-1">
                  Original Order / Invoice Reference <span className="text-red-500">*</span>
                </label>
                <input
                  id="orderId"
                  type="text"
                  required
                  placeholder="e.g., ORD-2026-9912A"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm h-10"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">
                  Target Resell Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  placeholder="Enter asking price amount"
                  value={resellPrice}
                  onChange={(e) => setResellPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm h-10"
                />
              </div>
            </div>

            {/* Condition Evaluation Dropdown Selector */}
            <div>
              <label htmlFor="conditionGrade" className="block text-sm font-bold text-gray-700 mb-1">
                Self-Assessed Item Condition <span className="text-red-500">*</span>
              </label>
              <select
                id="conditionGrade"
                required
                value={conditionGrade}
                onChange={(e) => setConditionGrade(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm cursor-pointer h-10"
              >
                <option value="">Select condition grade profile...</option>
                <option value="Like New">Like New (Perfect operational state, minimal box cosmetic wear)</option>
                <option value="Good">Good (Minor surface scuffs/scratches, fully functional)</option>
                <option value="Fair">Fair (Noticeable cosmetic marks, works perfectly)</option>
              </select>
            </div>

            {/* DRAG AND DROP FILE COMPONENT PIECE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Upload Product Verification Image <span className="text-gray-400 font-normal text-xs">(Highly Recommended)</span>
              </label>
              <p className="text-xs text-gray-400 mb-2">Provide a crisp image of the physical asset to compute its verified AI alignment score index metric.</p>
              
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
              />

              {!imagePreview ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors max-w-md ${
                    isDragging ? "border-amber-500 bg-orange-50/50" : "border-gray-300 bg-gray-50 hover:bg-gray-100/70"
                  }`}
                >
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Drag & drop your product photo here, or <span className="text-amber-600 underline">browse files</span></p>
                  <p className="text-[11px] text-gray-400 mt-1">Supports PNG, JPG, JPEG formats</p>
                </div>
              ) : (
                <div className="relative border border-gray-200 rounded-lg p-3 max-w-md bg-gray-50 flex items-center gap-3">
                  <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center shrink-0 border border-gray-300">
                    <img src={imagePreview} alt="Resell asset snapshot" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-gray-800 truncate flex items-center gap-1">
                      <FileImage className="h-3.5 w-3.5 text-amber-600" />
                      {selectedImage?.name}
                    </p>
                    <p className="text-gray-400 mt-0.5">Size: {((selectedImage?.size || 0) / (1024 * 1024)).toFixed(2)} MB</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Ready for listing check
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-gray-900 text-white p-1 rounded-full hover:bg-red-600 transition-colors cursor-pointer border-0 shadow"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Description Textarea Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
                Item Condition Note / Functional Description <span className="text-xs font-normal text-gray-400">(Optional)</span>
                <span className="group relative text-gray-400 hover:text-gray-600 cursor-help">
                  <HelpCircle className="h-4 w-4" />
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white font-normal text-[11px] p-2 rounded shadow w-48 z-10 leading-normal">
                    Assists potential direct circular ecosystem buyers in browsing your offer parameters.
                  </span>
                </span>
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Detail current accessory contents, micro scratches, packaging presence attributes, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <hr className="border-gray-200" />

            {/* Bottom Footer Actions block */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                Next Step: Instant AI grading & index tracking logic layer.
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-2 rounded shadow-sm text-sm border border-amber-600/20 cursor-pointer select-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Generating AI Report..." : "Submit for AI Assessment"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}