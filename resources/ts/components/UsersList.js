
function UsersList  (users){
    let template = ``;

    users.forEach((item) => {
        template += `
        <option accesskey="${item.id}" value="${ item.id}">${item.name}</option>
        `;
    });

    document.getElementById('UpdateID').innerHTML = template;
}

export default  UsersList;
