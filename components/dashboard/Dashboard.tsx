import AuthWrapper from '@/components/wrapper/Wrapper'
import React from 'react'

const Dashboard = () => {
  return (
    <>
    
    <AuthWrapper>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        {/* Your dashboard content */}
      </div>
    </AuthWrapper>
    </>
  )
}

export default Dashboard