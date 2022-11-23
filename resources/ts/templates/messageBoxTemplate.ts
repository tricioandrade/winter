export const _ = `
<style>

.modal {
    margin-top:10rem;
}

.modal:after{
    content:'';
    position:fixed;
    top:0;
    lef:0;
    width:100%;
    height:100%;
    background:rgb(0 0 0 / 55%);
    z-index:-1;
}


</style>


<div id="modal-class" class="modal active animation" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Alerta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="message"><slot name="modal-message"></slot></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn close btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
   </div>
 </div>
`;

export default _;
