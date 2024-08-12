package com.hakathon.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.hakathon.entity.BankTransaction;

@Service
public interface BankTransactionService
{
    boolean addBankTransaction(BankTransaction bankTransaction);
    List<BankTransaction> getAllBankTransactions();
	boolean isBankTransactionExist(Long transactionId);
    BankTransaction getBankTransactionById(Long transactionId);
    boolean deleteBankTransaction(Long transactionId);
    boolean updateBankTransaction(BankTransaction bankTransaction);
    
}
