const { nanoid } = require('nanoid');
const notes = require('./notes');

// handler menambahkan notes
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

// handler mendapatkan seluruh notes
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// handler mendapatkan notes berdasarkan id
const getNoteByIdHandler = (request, h) => {
    // eslint-disable-next-line max-len
    // mengembalikan objek catatan secara spesifik berdasarkan id yang digunakan oleh path parameter.
    const { id } = request.params;

    // mendapatkan objek note dengan id tsb dari objek array notes
    // menggunakan method array filter() utk get objek
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// handler edit notes
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    // mendapatkan data notes terbaru yang dikirimkan client melalui body request
    const { title, tags, body } = request.payload;

    // perbarui properti updatedAt
    const updatedAt = new Date().toISOString();

    // mengubah catatan lama dengan data terbaru dengan indexing array
    const index = notes.findIndex((note) => note.id === id);

    // bila id tidak ditemukan, maka index bernilai -1
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// menggunakan objek literals
// untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript.
module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
};