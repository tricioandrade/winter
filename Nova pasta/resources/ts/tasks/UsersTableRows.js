import Preloader from "./Preloader";

const UsersTableRows = (user) => {
    const UsersTable = document.querySelector('table#UsersTable tbody');

    let tableRows = '';
    let i = 1;

    user.map( props => {
        if (props.id !== 1) {
            tableRows += `
          <tr id="U${props.id}">
                <td>${props.name}</td>
                <td>${props.email}</td>
                <td>
                    <form class="deleteUser" >
                        <button type="submit" value="${props.id}" class="text-center bg-transparent border-0 text-danger" id="removeUser${props.id}"><i class="fa fa-trash-alt"></i></button>
                    </form>
                </td>
            </tr>
        `;
        }
        i++;
    });

    UsersTable.innerHTML = tableRows;
    Preloader().remove();
}

export default UsersTableRows;
