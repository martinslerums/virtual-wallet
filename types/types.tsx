type Params = {
  params: {
    id: string
  }
}

type Wallet = {
	_id: string,
	name: string,
	balance: number,
	currency: string,
	user: {
		_id: string,
		username: string,
	}
}

type Transaction = {
	_id: string,
	fraudulent: boolean;
	amount: number,
	description: string,
	type: string,
	createdAt: Date,
	wallet: {
		_id: string,
		name: string,
	}
}
