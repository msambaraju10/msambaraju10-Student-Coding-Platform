package com.hakathon.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hakathon.entity.Bank;
import com.hakathon.entity.BankTransaction;
import com.hakathon.repository.BankRepo;
import com.hakathon.repository.BankTransactionRepo;
import com.hakathon.repository.ContestRegistrationsRepository;
import com.hakathon.repository.ContestsRepository;
import com.hakathon.entity.ContestRegistrations;
import com.hakathon.entity.Contests;
import com.hakathon.entity.Payments;
import com.hakathon.repository.PaymentsRepository;
import com.hakathon.service.PaymentsService;

import java.util.List;
import java.util.Optional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class PaymentsServiceImpl implements PaymentsService {

    private final PaymentsRepository paymentsRepository;
    
    @Autowired
    BankTransactionRepo bankTransactionRepo;
	
	@Autowired
	BankRepo bankRepo;
	
	@Autowired
	ContestRegistrationsRepository contestRegistrationRepo;
	
	@Autowired
	ContestsRepository contestsRepository;

    @Autowired
    public PaymentsServiceImpl(PaymentsRepository paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }

    @Override
    public List<Payments> getAllPayments() {
        return paymentsRepository.findAll();
    }

    @Override
    public Payments getPaymentById(Long paymentId) {
        Optional<Payments> optionalPayment = paymentsRepository.findById(paymentId);
        return optionalPayment.orElse(null);
    }

    @Override
    public Payments savePayment(Payments payment) {
        return paymentsRepository.save(payment);
    }

    @Override
    public void deletePayment(Long paymentId) {
        paymentsRepository.deleteById(paymentId);
    }
    
    @Override
    public List<Payments> getPaymentsByRegistrationId(Long registrationId) {
        return paymentsRepository.findByContestRegistrations_RegistrationId(registrationId);
    }

	@Override
	public boolean makePayment(ContestRegistrations contestRegistration, String cardNumber, String cvvNumber,
			String expDate) {
		
//		System.out.println(contestRegistration);
		Bank account = bankRepo.findByCardNumberAndCvvNumberAndExpiryDate(cardNumber, cvvNumber, expDate);
		if(account==null) {
			return false;
		}
		
		System.out.println("Bank found");
		System.out.println(contestRegistration);
		//contestRegistration = contestRegistrationRepo.findById(contestRegistration.get)
		Contests contests = contestRegistration.getContests();
		Optional<Contests> contests1 = contestsRepository.findById(contests.getContestId());
		
		System.out.println("main"+contests1.get().getFeeAmount());
		
		if(account.getBalance() < (float)contests1.get().getFeeAmount()) {
			return false;
		}
		
		contestRegistration.setPaymentStatus("done");
		contestRegistrationRepo.save(contestRegistration);
		
		
		
		
		account.setBalance((float) (account.getBalance() - (float)contests1.get().getFeeAmount()) );
		bankRepo.save(account);
		
		BankTransaction trans = new BankTransaction();
		trans.setFromCardNo(cardNumber);
		trans.setToCardNo("1122334411223344");
		
		 LocalDate currentDate = LocalDate.now();
	        
	        // Define the format for the date
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        
	        // Format the current date into a string
	        String currentDateAsString = currentDate.format(formatter);
	        
	        
		trans.setTransactionDate(contestRegistration.getRegistrationDate());
		trans.setAmount((float)contests1.get().getFeeAmount());
		
		bankTransactionRepo.save(trans);
		
		
		
		
		account = bankRepo.findAccountOnCardNumber("1122334411223344");
		account.setBalance((float) (account.getBalance() + (float)contests1.get().getFeeAmount()) );
		bankRepo.save(account);
		
		
		
		return true;
		
		
	}
}

