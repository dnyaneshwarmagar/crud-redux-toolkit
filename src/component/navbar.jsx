import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { searchUser } from '../features/userDetailsSlice';

const navbar = () => {
  const [searchData,setSearchData] = useState("");
  const dispatch = useDispatch()

  const allUsers = useSelector(state=>state.userDetailsData.users);

  useEffect(()=>{
    dispatch(searchUser(searchData))
  },[searchData]);


  return (
    <div className=''>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <h4 className="navbar-brand">RTK</h4>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  All Post ({allUsers.length})
                </Link>
              </li>
            </ul>
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default navbar