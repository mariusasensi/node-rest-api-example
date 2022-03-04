
const home = (request, response) => {
  response.json({'msg': 'Hello world'});
};

const add = (request, response) => {
  const body = request.body;

  response.json({
    'your-message': body
  });
}

const put = (request, response) => {
  const id = request.params.id;
  const {q = 'no value'} = request.query;

  response.json({
    'your-param-id': id,
    'your-query-q': q,
  });
}

module.exports = { home, add, put };