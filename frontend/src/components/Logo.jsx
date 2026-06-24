export function AppLogo({ height = 32, className = '' }) {
  return (
    <img src="/edufund_20.png" alt="EduFund" style={{ height, width: 'auto' }} className={className} />
  )
}

// Alias — used in various places
export function AppIcon({ size = 48, className = '' }) {
  return (
    <img src="/edufund_20.png" alt="EduFund" style={{ height: size, width: 'auto' }} className={className} />
  )
}

export function AppWordmark({ className = '' }) {
  return (
    <img src="/edufund_20.png" alt="EduFund" style={{ height: 24, width: 'auto' }} className={className} />
  )
}
