<?php
namespace App\Http\Controllers;
use Paypack\Paypack;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Services\PaypackService;


class PaymentController extends Controller
{
    //
    public function initiate(Request $request, PaypackService $paypack)
    {
// dd('Hello from PaymentController');

      $request->validate([
            'order_id' => 'required|exists:orders,id',
            'phone' => 'required',
        ]);

       $order = Order::findOrFail($request->order_id);
if (is_null($order->total_price)) {
    return response()->json([
        'message' => 'Order total amount is missing.',
    ], 400);
}

        $response = $paypack->requestPayment($request->phone, $order->total_price);
          $transaction = Transaction::create([
            'order_id' => $order->id,
            'phone' => $request->phone,
            'network' => $this->detectNetwork($request->phone),
            'status' => $response['status'] ?? 'pending',
            'paypack_reference' => $response['ref'] ?? null,
            'response' => $response,
        ]);
     
         return response()->json([
            'message' => 'Payment initiated.',
            'transaction' => $transaction,
        ]);
    }


     private function detectNetwork(string $phone): string
    {
        // Basic Rwandan network check
        return str_starts_with($phone, '078') ? 'mtn' : 'airtel';
    }

public function webhook(Request $request)
{
    $data = $request->all();

    $transaction = Transaction::where('paypack_reference', $data['ref'])->first();

    if ($transaction) {
        $transaction->update([
            'status' => $data['status'], // 'success', 'failed', etc.
            'response' => $data,
        ]);

        $transaction->order->update([
            'status' => $data['status'] === 'success' ? 'paid' : 'unpaid',
        ]);
    }

    return response()->json(['message' => 'Webhook received']);
}


}
