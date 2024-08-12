package com.hakathon.service;

import java.util.List;

import com.hakathon.entity.ContestRegistrations;
import com.hakathon.entity.Payments;

public interface PaymentsService {

    List<Payments> getAllPayments();

    Payments getPaymentById(Long paymentId);

    Payments savePayment(Payments payment);

    void deletePayment(Long paymentId);
    
    List<Payments> getPaymentsByRegistrationId(Long registrationId);
    
    boolean makePayment(ContestRegistrations contestRegistration, String cardNumber, String cvvNumber, String expDate);
}

