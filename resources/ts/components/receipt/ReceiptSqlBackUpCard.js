import axios from "../../api/axios";
import MessageBox from "../components/MessageBox";
import Preloader from "../../tasks/Preloader";


function ReceiptSqlBackUpCard  (){

    return `
            <div class="card-body">
                <h2 class="card-title">Banco de Dados </h2>
                <p class="card-text">Backup do banco de dados</p>
            </div>

            <div class="card-footer  text-left">
                <button id="backupSql" class="btn btn-primary">Executar</button>
            </div>
    `;
}

export default  ReceiptSqlBackUpCard;
