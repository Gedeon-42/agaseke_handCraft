<?php

namespace App\Services;

use Paypack\Paypack;

class PaypackService
{
    protected $paypack;

    public function __construct()
    {
        //   dd(env('PAYPACK_CLIENT_ID'), env('PAYPACK_CLIENT_SECRET'));
   
    // ...existing code...
        $this->paypack = new Paypack();

        $this->paypack->config([
            'client_id'     => env('PAYPACK_CLIENT_ID'),
            'client_secret' => env('PAYPACK_CLIENT_SECRET'),
            'webhook_mode'  => env('PAYPACK_WEBHOOK_MODE', 'development'),
        ]);
    }

    public function requestPayment(string $phone, int $amount)
    {
        return $this->paypack->Cashin([
            'phone' => $phone,
            'amount' => $amount,
        ]);
    }

    public function sendMoney(string $phone, int $amount)
    {
        return $this->paypack->Cashout([
            'phone' => $phone,
            'amount' => $amount,
        ]);
    }

    public function listTransactions(int $offset = 0, int $limit = 100)
    {
        return $this->paypack->Transactions([
            'offset' => $offset,
            'limit' => $limit,
        ]);
    }
}
