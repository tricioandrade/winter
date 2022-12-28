import axios from "../../api/axios";
import MessageBox from "../components/MessageBox";
import Preloader from "../../tasks/Preloader";


function ReceiptSaftCard  (){



    return `
                    <div class="card-body">
                        <h5 class="card-title">Exportar &horbar; SafT </h5>
                        <p class="card-text">Exportação do ficheiro SAFT</p>
                    </div>

                    <div class="row card-footer  text-left">
                        <div class="col-12">
                            <form class="row" id="saftExportFormDate">
                                <div class="col mt-2">
                                    <label for="safTDate">Escolha uma data!</label>
                                    <select class='form-control' id="safTDate">
                                    </select>
                                    <button type="submit" class="btn btn-primary mt-2">Exportar</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-12">
                            <form class="row" id="saftExportFormYear">
                                <div class="col mt-2">
                                    <label for="safTYear">Selecione um ano</label>
                                    <select class='form-control' id="safTYear">
                                    </select>
                                    <button type="submit" class="btn btn-primary mt-2">Exportar</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-12">
                            <form class="row" id="saftExportFormMonth">
                                <div class="col mt-2">
                                    <label for="safTMonth">Selecione o mês!</label>
                                    <select class='form-control' id="safTMonth">
                                    </select>
                                   <button type="submit" class="btn btn-primary mt-2">Exportar</button>
                                </div>
                            </form>
                       </div>
                    </div>
    `;
}

export default  ReceiptSaftCard;
