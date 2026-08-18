import React from 'react'

const TrustStats = () => {
  return (
    <div>
      <section className="border-y border-slate-800 bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-800 sm:grid-cols-4 sm:divide-y-0">
          
          {/* Item 1 */}
          <div className="px-5 py-7 text-center sm:px-6">
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              24/7
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
              Account access
            </p>
          </div>

          {/* Item 2 */}
          <div className="px-5 py-7 text-center sm:px-6">
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Secure
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
              Authentication
            </p>
          </div>

          {/* Item 3 */}
          <div className="px-5 py-7 text-center sm:px-6">
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Real-time
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
              Transaction tracking
            </p>
          </div>

          {/* Item 4 */}
          <div className="px-5 py-7 text-center sm:px-6">
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Fast
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
              Money transfers
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default TrustStats
