package com.hakathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hakathon.entity.BankTransaction;

public interface BankTransactionRepo  extends JpaRepository<BankTransaction, Long>{

}
