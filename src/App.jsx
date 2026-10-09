import { useRef, useEffect, useState } from 'react'

export default function App() {
  const videoRef = useRef(null)
  const videoBoxRef = useRef(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let stream
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (running) startCamera()
    else if (videoRef.current) videoRef.current.srcObject = null
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop())
    }
  }, [running])

  const handleClear = () => {
    if (videoRef.current) videoRef.current.srcObject = null
    setRunning(false)
  }
  const handleRefresh = () => {
    setRunning(false)
    setTimeout(() => setRunning(true), 300)
  }
  const handleSettings = () => alert('Settings: 1280x720 | 30 FPS')
  const handleFullscreen = () => {
    if (!document.fullscreenElement) videoBoxRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }

  return (
    <div className="min-h-screen bg-[#F2F7F9] p-3">
      {/* HEADER - CLEAN LIKE CARDS */}
      <div className="bg-white border border-slate-200 rounded-full px-2 py-1.5 flex items-center gap-2 shadow-sm">
        <div className="flex items-center shrink-0 bg-[#0F2243] rounded-full px-1 py-1">
          <img src="/live-vision.png" alt="Live Vision AI" className="h-[32px] w-auto rounded-full" onError={(e)=>e.currentTarget.style.display='none'} />
        </div>
        <span className="font-bold text-[12px] hidden md:block">VisionStock FMCG</span>
        <div className="hidden md:flex bg-[#F8FAFC] border border-slate-200 rounded-full px-2.5 py-1 text-[10px] items-center">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1"></span>Central • Bay A3
        </div>
        <div className="flex-1 max-w-[260px] bg-[#F8FAFC] border border-slate-200 rounded-full px-3 py-1.5 flex gap-2 text-[10px]">⌕<input placeholder="Search SKUs..." className="bg-transparent outline-none w-full" /></div>
        <div className="ml-auto flex gap-2 items-center">
          <div className="bg-green-50 border border-green-200 rounded-full px-3 py-1 text-[9px] font-bold hidden md:block">30 FPS • 16 FEEDS</div>
          <div className="w-7 h-7 bg-white border border-slate-200 rounded-full grid place-items-center text-[12px]">🔔</div>
        </div>
      </div>

      {/* MODEL BAR - ALSO CARD STYLE */}
      <div className="mt-3 bg-[#EAF0FF] rounded-[16px] border border-slate-200 p-2 shadow-sm">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="bg-white rounded-full p-1 flex gap-1 text-[12px] border border-slate-200 shadow-sm">
            <button className="border border-slate-200 shadow-sm px-4 py-1.5 rounded-full font-medium bg-white">🛒 Retail Model</button>
            <button className="px-4 py-1.5 text-slate-500">Warehouse Model</button>
            <button className="px-4 py-1.5 text-slate-500">Loading Model</button>
          </div>
          <div className="flex gap-2 text-[11px] items-center">
            <span className="bg-white border border-slate-200 rounded-full px-3 py-1">Default Mode ▾</span>
            <span className="bg-white border border-slate-200 rounded-full px-3 py-1">Auto add</span>
          </div>
        </div>
        <div className="mt-2 bg-white rounded-full px-3 py-2 flex justify-between items-center border border-slate-200">
          <button onClick={() => setRunning(!running)} className={`${running? 'bg-red-600' : 'bg-green-600'} text-white px-4 py-1.5 rounded-full text-[12px] font-bold`}>{running? 'Stop Model ■' : 'Start Model ▶'}</button>
          <div className="border border-slate-200 rounded-full px-3 py-1 text-[11px] bg-[#F8FAFC]">CAM - 01 | Aisle 1 - Rack B2</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.85fr] gap-3 mt-3 items-start">

        {/* LEFT - VIDEO CARD - NO BLACK LINES, SAME AS OTHER CARDS */}
        <div className="bg-white rounded-[16px] border border-slate-200 p-3 shadow-sm">
          <div className="flex justify-between px-1 pb-3">
            <p className="text-[12px] font-bold flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full"></span>Live AI Detection Stream</p>
            <p className="text-[10px] text-slate-400">FPS: 28 | 1280 × 720</p>
          </div>
          <div ref={videoBoxRef} className="relative rounded-[14px] overflow-hidden bg-black h-[460px] w-full">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#E9E95C] z-10"></div>
            <div className="absolute top-3 left-3 z-20 bg-[#52525B] text-white text-[11px] px-3.5 py-1 rounded-full">Normal Area</div>
            <div className="absolute top-3 left-[51%] z-20 bg-[#22C55E] text-white text-[11px] px-3.5 py-1 rounded-full">Sold Area</div>
            <div className="absolute bottom-0 left-0 right-0 bg-[#1E293B] text-white text-[11px] px-3 py-2.5 flex justify-between items-center z-20">
              <span>📷 Laptop Webcam (Default) ▾</span>
              <div className="flex gap-2 text-[13px]">
                <button onClick={handleClear} className="hover:bg-white/20 w-7 h-7 rounded grid place-items-center">🗑️</button>
                <button onClick={handleRefresh} className="hover:bg-white/20 w-7 h-7 rounded grid place-items-center">↻</button>
                <button onClick={handleSettings} className="hover:bg-white/20 w-7 h-7 rounded grid place-items-center">⚙️</button>
                <button onClick={handleFullscreen} className="hover:bg-white/20 w-7 h-7 rounded grid place-items-center bg-white/10">⛶</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3">
          {/* 3 CARDS - NO OVERLAP */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-[14px] border border-slate-200 p-4 shadow-sm">
              <p className="text-[11px] text-[#2563EB] font-medium leading-tight">Total<br/>Items Sold</p>
              <div className="flex justify-between items-end mt-2">
                <div><p className="text-[26px] font-bold leading-none">33</p><p className="text-[11px] text-[#16A34A] font-semibold mt-1">Today</p></div>
                <div className="w-9 h-9 rounded-full border-2 border-blue-200 bg-blue-50 flex items-center justify-center text-[14px]">✔️</div>
              </div>
            </div>
            <div className="bg-white rounded-[14px] border border-slate-200 p-4 shadow-sm">
              <p className="text-[11px] text-[#2563EB] font-medium leading-tight">Total<br/>Revenue</p>
              <div className="flex justify-between items-end mt-2">
                <div><p className="text-[20px] font-bold leading-none">₹ 1254</p><p className="text-[11px] text-[#16A34A] font-semibold mt-1">Today</p></div>
                <div className="flex items-end gap-1"><div className="w-3 h-4 bg-yellow-400 rounded"></div><div className="w-3 h-6 bg-yellow-400 rounded"></div><div className="w-3 h-8 bg-yellow-400 rounded"></div></div>
              </div>
            </div>
            <div className="bg-white rounded-[14px] border border-slate-200 p-4 shadow-sm">
              <p className="text-[11px] text-[#2563EB] font-medium leading-tight">Return<br/>Items</p>
              <div className="flex justify-between items-end mt-2">
                <div><p className="text-[26px] font-bold leading-none">0</p><p className="text-[11px] text-[#16A34A] font-semibold mt-1">Today</p></div>
                <div className="text-green-500 text-xl">↗</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[16px] border border-slate-200 p-4 shadow-sm">
            <div className="flex justify-between"><p className="text-[12px] font-bold">Detected Item</p><span className="bg-green-50 text-green-700 text-[9px] px-2 py-1 rounded-full border border-green-200">0% confidence</span></div>
            <div className="flex gap-3 mt-4"><div className="w-10 h-14 bg-yellow-50 border border-yellow-200 rounded grid place-items-center">!</div><div><p className="text-[11px] font-bold">No items detected yet</p><p className="text-[10px] text-slate-500">Place an item in camera.</p></div></div>
          </div>

          <div className="bg-white rounded-[16px] border border-slate-200 p-3 shadow-sm">
            <div className="flex justify-between text-[12px] font-bold"><span>Current Cart (0)</span><span className="text-[10px] text-slate-400 font-normal">Clear Cart</span></div>
            <div className="bg-[#F8FAFC] border border-slate-200 grid grid-cols-4 text-[9px] text-slate-400 p-2 mt-3 rounded-full"><span>ITEM</span><span>QTY</span><span>PRICE</span><span>TOTAL</span></div>
            <div className="flex justify-between mt-6 pt-3 border-t border-slate-200"><span className="text-[13px]">Total</span><span className="font-bold text-[16px]">₹0.00</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}