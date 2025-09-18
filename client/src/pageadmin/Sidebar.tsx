import { NavLink } from 'react-router'

const Sidebar = () => {
  return (
    <div className="col-sm-3 pt-3 pb-3">
      <div className="list-group">
        {/* <NavLink to={`/admin`} className={ ({ isActive }) => (isActive ? "list-group-item active" : "list-group-item") }>Home</NavLink> */}
        <NavLink
          to={`/admin/user`}
          className={({ isActive }) =>
            isActive ? 'list-group-item active' : 'list-group-item'
          }
        >
          Usuario
        </NavLink>
        <NavLink
          to={`/admin/category`}
          className={({ isActive }) =>
            isActive ? 'list-group-item active' : 'list-group-item'
          }
        >
          Categoría
        </NavLink>
        <NavLink
          to={`/admin/company`}
          className={({ isActive }) =>
            isActive ? 'list-group-item active' : 'list-group-item'
          }
        >
          Empresa
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
