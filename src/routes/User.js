import { Outlet, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect, useRef, useState } from "react"


export default function User () {

  const [contacts, setContacts] = useState([])
  const navigate = useNavigate()
  const [filterContacts, setFilterContacts] = useState([])
  const getData = async () => {
    await axios.get('http://localhost:8888/lists').then((response) => {
      const { code, data } = response.data
      if (code == 200) {
        setContacts(data)
        setFilterContacts(data)
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  useEffect(function () {
    getData()
  }, [contacts])

  const formRef = useRef()

  const searchObj = () => {
    const name = formRef.current['keyword'].value
    let reslist = contacts.filter((contact) => {
      return contact.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    })
    setFilterContacts(reslist)
  }

  const add = () => {
    return navigate(`/user/contacts/add`, { state: { contact: { id: contacts.length, name: "", avatar: "", twitter: "", notes: "", favorite: false } } })
  }
  return (
    <>
      <div className="sidebar">

        <div className="formfield">
          <form ref={formRef} className="form">
            <input
              placeholder="Search"
              type="text"
              name="keyword"
              onChange={searchObj}
            />
            <button type="button" onClick={add} >Add</button>
          </form>
        </div>
        <nav>
          {filterContacts.length ? (
            <ul>
              {filterContacts.map((contact) => (
                <li key={contact.id} className="contactItem">
                  <Link to={`contacts/${contact.name}`}>
                    {contact.name ? (
                      <>
                        {contact.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div className="detailContent">
        <Outlet />
      </div>
    </>
  )
}