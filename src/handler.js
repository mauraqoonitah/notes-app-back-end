const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    // unik id
    const id = nanoid(16);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };
    // masukan nilai-nilai tersebut ke dalam array notes menggunakan method push().
    notes.push(newNote);

    // cek apakah newNote sudah masuk ke dalam array notes
    // method filter() berdasarkan id notes
    // isSuccess untuk menentukan respons yang diberikan server.
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// menggunakan objek literals
// untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript.

module.exports = { addNoteHandler };