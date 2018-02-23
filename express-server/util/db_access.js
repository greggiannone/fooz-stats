const sql = require('mssql');

var config = 
{
    user: 'foozapi',
    password: 'f00zstats',
    server: 'ONE-017054',
    database: 'HMCTFS',
	options: 
	{
        instanceName: 'ALACRITY'
    }
}

module.exports = 
{
	sendQuery: function (query, params, res)
	{
		const pool = new sql.ConnectionPool(config, err =>
		{
			var ps = new sql.PreparedStatement(pool);
			var inputParams = {};

			params.forEach(function(param) 
			{
				// Give the input type to the prepared satement
				ps.input(param["name"], param["type"]);

				// Give a key/value pair to the input params
				inputParams[param["name"]] = param["value"];

			}, this);

			ps.prepare(query, function(err)
			{
				ps.execute(inputParams, function (err, recordset)
				{
					ps.unprepare(function(err)
					{
						if (err) console.log(err);
					});
					if (err) 
					{
						res.end("Invalid request");
						console.log(err);
					}
					else
					{
						res.end(JSON.stringify(recordset.recordset));
					}
				});
			});
		});
	}
}