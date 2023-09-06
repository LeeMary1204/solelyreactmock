import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function EditContact () {

  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const { contact } = state


  const submit = () => {
    axios.post(`http://localhost:8888/update/${contact.id}`, contact).then((response) => {
      const { code } = response.data
      if (code == 200) {
        console.log('update successfully')
      }
    }).catch((error) => {
      console.error(error)
    })

    return navigate(`/user/contacts/${contact.name}`)
  }

  const changeForm = (event) => {
    const { name, value } = event.target
    var obj = { [name]: value }
    console.log(obj)
    Object.assign(contact, obj)
    console.log(contact)
  }

  return (
    <form method="post" className="editForm">
      <p>
        <span className="label">Name</span>
        <input
          placeholder="id"
          type="hidden"
          name="id"
          defaultValue={contact.id}
        />
        <input
          placeholder="userName"
          type="text"
          name="name"
          className="editNameInput"
          defaultValue={contact.name || ""}
          onChange={changeForm}
        />
      </p>
      <label>
        <span className="label">Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter || ""}
          className="editTwitterInput"
          onChange={changeForm}
        />
      </label>
      <br />
      <label>
        <span className="label">Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          className="editAvatarInput"
          defaultValue={contact.avatar || ""}
          onChange={changeForm}
        />
      </label>
      <br />
      <label>
        <span className="label noteLabel">Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes || ""}
          onChange={changeForm}
          className="editNoteInput"

        />
      </label>
      <p>
        <button type="button" onClick={submit} className="save">Save</button>
        <button className="cancel" type="button" onClick={() => {
          navigate(-1)
        }}>Cancel</button>
      </p>
    </form>
  )
}