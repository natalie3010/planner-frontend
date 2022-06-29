<Row justify="around">
    <Col md={3}>
      <b>
        Divider
      </b>
    </Col>
    <Col>
      <Table
        customKeyNames={{
          firstname: 'first name',
          lastname: 'last name'
        }}
        data={[
          {
            city: 'London',
            email: 'barnie@outlook.com',
            firstname: 'Barnie',
            proffession: 'Farmer',
            year: 1980
          },
          {
            city: 'New York',
            email: 'amanda@gmail.com',
            firstname: 'Amanda',
            lastname: 'Cook'
          },
          {
            email: 'ben@yahoo.com',
            firstname: 'Ben',
            lastname: 'Baker',
            proffession: 'Accountant',
            year: 1995
          },
          {
            city: 'Tokyo',
            email: 'andy@outlook.com',
            firstname: 'Andy',
            proffession: 'Baker',
            year: 2002
          },
          {
            email: 'samantha@gmail.com',
            firstname: 'Samantha',
            year: 2008
          }
        ]}
        divider
        selectedKeys={[
          'email',
          'firstname',
          'city',
          'year'
        ]}
      />
    </Col>
  </Row>