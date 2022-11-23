import './sidebar_long.css';
import './sidebar_script';

const Sidebar = () => {
    const userName = document.querySelector('#user-name').textContent;
    const logoutContent = document.querySelector('#logout-content').innerHTML;

    return document.querySelector('#sidebar-root').innerHTML = `
        <div class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div class="border-end bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading border-bottom bg-light">Outono</div>
                <div id="request-component" class="list-group list-group-flush d-flex mt-4">
                   <div class="row mt-5">
                       <div class="col-3 pl-6 text-center"><i class="pr-3 fa fa-home"></i></div>
                       <div class="col-9">
                           <a id="sales" class="list-group-item border-0 list-group-item-action text-uppercase list-group-item-light text-start p-0 d-inline-block  align-items-center " onclick="" href="#!">
                              Vender
                           </a>
                       </div>
                   </div>
                   <div class="row mt-5">
                       <div class="col-3 pl-6 text-center"><i class="fa fa-receipt"></i></div>
                       <div class="col-9">
                           <a id="inventory" class="list-group-item border-0 list-group-item-action text-uppercase list-group-item-light text-start p-0 d-inline-block  align-items-center " onclick="" href="#!">
                               Inventário
                           </a>
                       </div>
                   </div>
                   <div class="row mt-5">
                       <div class="col-3 pl-6 text-center"><i class="fa fa-file-invoice"></i></div>
                       <div class="col-9">
                           <a id="receipts" class="list-group-item border-0 list-group-item-action text-uppercase list-group-item-light text-start p-0 d-inline-block  align-items-center " onclick="" href="#!">
                                Relatórios
                           </a>
                       </div>
                   </div>
                   <div class="row mt-5">
                       <div class="col-3 pl-6 text-center"><i class="fa fa-user-cog"></i></div>
                       <div class="col-9">
                           <a id="users" class="list-group-item border-0 list-group-item-action text-uppercase list-group-item-light text-start p-0 d-inline-block  align-items-center " onclick="" href="#!">
                                Usuários
                           </a>
                       </div>
                   </div>
                </div>
            </div>
            <!-- Page content wrapper-->
            <div id="page-content-wrapper" class="">
                <!-- Top navigation-->
                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div class="container-fluid">
                        <button class="btn btn-primary" id="sidebarToggle"><span class="navbar-toggler-icon"></span></button>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li class="nav-item active"><a class="nav-link" href="#!">Início</a></li>
                                <li class="nav-item"><a class="nav-link" href="#!">Link</a></li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${ userName }</a>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        ${ logoutContent }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <!-- Page content-->

            </div>
        </div>
    `;
};

export default Sidebar;



