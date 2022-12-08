import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (albums, isOwner, hasUser, onDelete)=> html`
<section id="details">
<div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
    <img src=${albums.imageUrl}/>
    </div>
    <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${albums.singer}</span></p>
    <p>
        <strong>Album name:</strong><span id="details-album">${albums.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${albums.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${albums.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${albums.sales}</span></p>
    </div>
    ${isOwner && hasUser ? html`
    <div id="action-buttons">
    <a href="/edit/${albums._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>
    ` : nothing}
</div>
</section>
`
export async function showDetails(ctx){
    const id = ctx.params.id;
    const albums = await getById(id);
    const hasUser = Boolean(ctx.user);
    const isOwner =  hasUser && albums._ownerId == ctx.user._id;
    ctx.render(detailsTemplate(albums, isOwner, hasUser, onDelete))

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this album?');

        if(choice){
            await deleteById(id)
            ctx.page.redirect('/dashboard')
        }
    }
}