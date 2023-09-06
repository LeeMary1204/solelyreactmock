import React from 'react'
import { Home, About, Contact, EditContact, UserIndex, User, ErrorPage } from './routes'
import { Route, Routes } from 'react-router-dom'

export default function App () {
  return (
    <>
      <Routes>
        <Route element={<Home />} exact path="/">
          <Route index element={<About />}  ></Route>
          <Route path="about" element={<About />}  ></Route>
          <Route path="user" element={<User />} exact>
            <Route index element={<UserIndex />}  ></Route>
            <Route path="contacts/:contactName" element={<Contact />}  ></Route>
            <Route path="contacts/:contactId/edit" element={<EditContact />}  ></Route>
            <Route path="contacts/add" element={<EditContact />}  ></Route>
          </Route>
        </Route>
        <Route element={<ErrorPage />} path="*" />
      </Routes >
    </>
  )
}
