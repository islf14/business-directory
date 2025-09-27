import { NavLink } from 'react-router'

export default function Sidebar() {
  return (
    <div className="col-sm-3 pt-3 pb-3">
      <div className="list-group">
        <NavLink
          to={`/admin/user`}
          className={({ isActive }) =>
            isActive ? 'list-group-item active' : 'list-group-item'
          }
        >
          Usuario
        </NavLink>
      </div>
    </div>
  )
}
