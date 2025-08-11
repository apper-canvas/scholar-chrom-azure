import React, { useContext } from "react"
import { useSelector } from 'react-redux'
import SearchBar from "@/components/molecules/SearchBar"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { AuthContext } from "@/App"
const Header = ({ title, search, onSearchChange, actions }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Title and Search */}
        <div className="flex items-center space-x-6 flex-1">
          <div className="pl-12 lg:pl-0">
            <h1 className="text-2xl font-bold text-gray-900 font-display">{title}</h1>
          </div>
          
          {search && (
            <div className="max-w-md w-full">
              <SearchBar
                value={search.value}
                onChange={onSearchChange}
                placeholder={search.placeholder}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {actions}
          
          {/* User Menu */}
<div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
            <UserInfo />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

const UserInfo = () => {
  const { user } = useSelector((state) => state.user)
  
  if (!user) return null
  
  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : user.emailAddress ? user.emailAddress[0].toUpperCase() : "U"
  
  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.emailAddress || "User"
  
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">{initials}</span>
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-medium text-gray-900">{displayName}</p>
        <p className="text-xs text-gray-500">Educator</p>
      </div>
    </div>
  )
}

const LogoutButton = () => {
  const { logout } = useContext(AuthContext)
  
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={logout}
      className="ml-3"
    >
      <ApperIcon name="LogOut" size={14} className="mr-2" />
      Logout
    </Button>
  )
}

export default Header