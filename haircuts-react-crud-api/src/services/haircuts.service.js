import http from "../http-common";

class HairCutDataService {
  getAll() {
    return http.get("/haircuts");
  }

  get(id) {
    return http.get(`/haircuts/${id}`);
  }

  create(data) {
    return http.post("/haircuts", data);
  }

  update(id, data) {
    return http.put(`/haircuts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/haircuts/${id}`);
  }

  deleteAll() {
    return http.delete(`/haircuts`);
  }

  findByTitle(title) {
    return http.get(`/haircuts?title=${title}`);
  }
}

export default new HairCutDataService();