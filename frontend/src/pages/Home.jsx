import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Lifetimetotal from '../components/Lifetimetotal'
import VisualizeChart from '../components/VisualizeChart'
import ContributionGraph from '../components/ContributionGraph'

const Home = () => {
  const { authUser } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />

      <div className="flex flex-col gap-6 p-4">
      {/* Top section (Welcome + buttons) */}
      <div className="flex flex-col gap-4">
        {authUser && (
          <h1 className="text-3xl font-bold">Welcome {authUser.fullName}</h1>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/add-finance')}
            className="btn btn-outline"
          >
            Add Finance
          </button>
          <button
            onClick={() => navigate('/view-finances')}
            className="btn btn-outline"
          >
            View Finance
          </button>
        </div>
      </div>

      {/* Side-by-side: Lifetimetotal and ContributionGraph */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="card bg-base-100 shadow p-4 flex-1">
          <Lifetimetotal />
        </div>
        <div className="card bg-base-100 shadow p-4 flex-1">
          <ContributionGraph />
        </div>
      </div>

      {/* Bottom: Chart */}
      <div className="card bg-base-100 items-center shadow p-4">
        <VisualizeChart />
        
      </div>
    </div>

    </div>
  )
}

export default Home
