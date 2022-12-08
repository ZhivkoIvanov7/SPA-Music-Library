import { editAlbum, getById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (albums, onEdit)=> html`
<section id="edit">
<div class="form">
    <h2>Edit Album</h2>
    <form @submit=${onEdit} class="edit-form">
    <input type="text" name="singer" id="album-singer" .value=${albums.singer}>
    <input type="text" name="album" id="album-album" .value=${albums.album}>
    <input type="text" name="imageUrl" id="album-img" .value=${albums.imageUrl}>
    <input type="text" name="release" id="album-release" .value=${albums.release}>
    <input type="text" name="label" id="album-label" .value=${albums.label}>
    <input type="text" name="sales" id="album-sales" .value=${albums.sales}>

    <button type="submit">post</button>
    </form>
</div>
</section>
`

export async function showEdit(ctx){
    const id = ctx.params.id;
    const albums = await getById(id);
    ctx.render(editTemplate(albums, createSubmitHandler(onEdit)));

    async function onEdit({singer, album, imageUrl, release, label, sales}){
        if(!singer || !album || !imageUrl || !release || !label || !sales){
            return alert('All fields are required!')
        }
        await editAlbum(id, {
            singer,
            album, 
            imageUrl, 
            release, 
            label, 
            sales            
        });
        ctx.page.redirect('/details/' + id);
    }
}