import Sidebar from './Sidebar'

const PanelAdmin = () => {
  return (
    <div className="container bg-light">
      <div className="row justify-content-center">
        <Sidebar />
        <div className="col-sm-9">
          <h1 className="text-center">Admin</h1>
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin
