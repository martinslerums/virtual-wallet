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
}

type Transaction = {
	_id: string,
	amount: number,
	description: string,
	type: string,
	createdAt: Date,
	wallet: {
		_id: string,
		name: string,
	}
}

// export type Comment = {
//   _id: string,
//   author: string,
//   comment: string,
//   createdAt: string,
//   blog: {
//     _id: string,
//     title: string,
//   }
// }
