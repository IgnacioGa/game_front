import React from 'react'

export const ListOfUsers = ({users}) => {
    console.log(users)
  return (
    <div className='room__users'>
        {
            users?.map((user) => <span key={user.id}>{user.email}</span>)
        }
    </div>
  )
}
