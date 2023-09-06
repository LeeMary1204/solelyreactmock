import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function Contact () {

  const [contact, setContact] = useState({})
  const { contactName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8888/search/${contactName}`).then((response) => {
      const { code, data } = response.data
      if (code == 200) {
        setContact(data[0])
      }

    }).catch((error) => {
      console.error(error)
    })
  }, [contactName])

  const edit = () => {
    return navigate(`/user/contacts/${contact.id}/edit`, { state: { contact: contact } })
  }

  const deleteFn = (event) => {
    if (
      window.confirm(
        "Please confirm you want to delete this record."
      )
    ) {
      axios.post(`http://localhost:8888/delete/${contact.id}`).then((response) => {
        const { code } = response.data
        console.log(response.data)
        if (code == 200) {
          console.log('delete successfully')
        }
        return navigate(`/user`)
      }).catch((error) => {
        console.error(error)
      })
    }
  }


  return (
    <div className="contact">
      <div className="imgField">
        <img
          src={contact.avatar || null}
        />
      </div>

      <div className="contactContent">
        <h1 className="contactName">
          <div className="name">
            {contact.name ? (
              <>
                {contact.name}
              </>
            ) : (
              <p>No Name</p>
            )}{" "}
          </div>
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p className="twitter">
            <a
              target="_blank"
              href={`https://solely-resume.netlify.app/`}
            >
              {contact.twitter}
            </a>
          </p>
        ) : (
          <p>No twitter</p>
        )}

        {contact.notes ? (<p className="notes">{contact.notes}</p>) : (<p>No notes</p>)}

        <div>

          <button type="button" onClick={edit} className="edit">Edit</button>
          <button type="button" onClick={deleteFn} className="delete">Delete</button>

        </div>
      </div>
    </div>
  )
}

function Favorite ({ contact }) {
  let favorite = contact.favorite

  return (
    <form>
      <button
        name="favorite"
        className="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </form>
  )
}