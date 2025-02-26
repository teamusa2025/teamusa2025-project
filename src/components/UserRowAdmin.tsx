import { Button } from '@mui/material';
import { User } from '@prisma/client';

/* Renders a single row in the list for admin users. */
const UserRowAdmin = ({ username, email, role, subrole, id }: User) => (
  <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
    <td className="px-6 py-4">{username}</td>
    <td className="px-6 py-4">{email}</td>
    <td className="px-6 py-4">{role}</td>
    <td className="px-6 py-4">{subrole}</td>
    <td className="px-6 py-4">
      <Button href={`/edit/${id}`} className="text-blue-600 hover:underline">
        Edit
      </Button>
    </td>
    <td>
      <Button href="#" className="text-blue-600 hover:underline">
        Delete
      </Button>
    </td>
  </tr>
);

export default UserRowAdmin;
