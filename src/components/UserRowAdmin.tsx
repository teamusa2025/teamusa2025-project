import { User } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const UserRowAdmin = ({ username, email, role, subrole, id }: User) => (
  <tr>
    <td>{username}</td>
    <td>{email}</td>
    <td>{role}</td>
    <td>{subrole}</td>
    <td>
      <a href={`/edit-user/${id}`}>Edit</a>
    </td>
  </tr>
);

export default UserRowAdmin;
