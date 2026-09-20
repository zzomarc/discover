export function IosStatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-black select-none">
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
      <rect x="0" y="7" width="3" height="5" rx="0.8" fill="black" />
      <rect x="4.5" y="5" width="3" height="7" rx="0.8" fill="black" />
      <rect x="9" y="3" width="3" height="9" rx="0.8" fill="black" />
      <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="black" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M8 9.8C8.66274 9.8 9.2 10.3373 9.2 11C9.2 11.6627 8.66274 12.2 8 12.2C7.33726 12.2 6.8 11.6627 6.8 11C6.8 10.3373 7.33726 9.8 8 9.8Z"
        fill="black"
      />
      <path
        d="M4.34 7.34C5.33 6.35 6.63 5.8 8 5.8C9.37 5.8 10.67 6.35 11.66 7.34"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.5 4.5C3.3 2.7 5.6 1.7 8 1.7C10.4 1.7 12.7 2.7 14.5 4.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="13" viewBox="0 0 25 13" fill="none" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="12"
        rx="3"
        stroke="black"
        strokeOpacity="0.35"
      />
      <rect x="2" y="2" width="18" height="9" rx="2" fill="black" />
      <path
        d="M23 4.5V8.5C23.8 8.1 24.3 7.2 24.3 6.5C24.3 5.8 23.8 4.9 23 4.5Z"
        fill="black"
        fillOpacity="0.35"
      />
    </svg>
  );
}
