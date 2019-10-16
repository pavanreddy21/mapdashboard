package com.zemoso.OKR;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"com.zemoso.OKR.user", "com.zemoso.OKR.objective","com.zemoso.OKR.team"})
@SpringBootApplication
public class OkrApplication {

	public static void main(String[] args) {
		SpringApplication.run(OkrApplication.class, args);
	}

}
