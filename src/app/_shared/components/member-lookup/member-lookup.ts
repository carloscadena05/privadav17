import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MemberMiniDTO } from '../../models/memberMiniDTO';
import { MemberDataService } from '../../services/member-data.service';
import { MemberSelectedService } from '../../services/member-selected-service';

@Injectable({
	providedIn: 'root'
})
export class MemberNameService {
	constructor(private memberData: MemberDataService) {}

	search(searchStr: string) {
		if (searchStr === '') {
			return of([]);
		}
		console.log('in search about to call getMemberMiniDTOs');
		return this.memberData.getCurrentMemberMiniDTOs(searchStr).pipe(
			// catchError(this.handleError),
			tap((x) => console.log(x))
		);
	}
}

@Component({
	selector: 'app-member-lookup',
	templateUrl: './member-lookup.html'
})
export class MemberLookupComponent implements OnInit, OnDestroy {
	memberMiniDTO: MemberMiniDTO;
	searching = false;
	searchFailed = false;
	currentGUId = '0000';
	memberName: string;
	email: string;
	memberGUId: string;
	private subscription: Subscription;

	// @Output() onSelectedMemberGUId = new EventEmitter<string>();

	constructor(
		private _service: MemberNameService,
		private router: Router,
		private memberData: MemberDataService,
		private memberSelected: MemberSelectedService
	) {
		console.log('name-lookup constructor!');
	}

	ngOnInit() {
		this.subscribeForMemberGUIds();
	}
	ngOnDestroy() {
		// console.log('{{{{{{{{{{{{{JA ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
		// this.memberSelected.unsubscribe();
		this.subscription.unsubscribe();
	}

	onSelect(item) {
		console.log('onSelect');
		console.log(item.item.memberId);
		console.log(item.item.memberGUId);
		this.currentGUId = item.item.memberGUId;
		// this.onSelectedMemberGUId.emit(item.item.memberGUId);
		this.memberSelected.notifyNewMemberGUId(item.item.memberGUId);
		this.email = item.item.email;
		this.memberName = item.item.memberName;
	}

	onFocus() {
		// console.log('onFocus');
		const input = document.getElementById('search-string') as HTMLInputElement;
		input.focus();
		input.select();
	}

	onInput() {
		console.log('onInput');
		const input = document.getElementById('search-string') as HTMLInputElement;
		if (input.value.length === 0) {
			this.resetMemberData();
		}
	}

	onClear() {
		console.log('onClear');
		const input = document.getElementById('search-string') as HTMLInputElement;
		input.focus();
		input.value = '';
		this.resetMemberData();
	}

	subscribeForMemberGUIds() {
		console.log('Name Lookup set up memberGUId subscription');
		this.subscription = this.memberSelected.subscribeForMemberGUIds().subscribe((message) => {
			this.memberGUId = message;
			console.log('Name Search new MemberGUId received' + this.memberGUId);
			if (this.memberGUId && this.memberGUId !== '0000') {
				this.currentGUId = this.memberGUId;
				this.fetchData();
			}
		});
	}

	fetchData() {
		this.memberData.getCurrentMemberMiniDTO(this.currentGUId).subscribe(
			(data) => {
				this.memberMiniDTO = data;
			},
			(err) => {
				return console.error('Subscribe error: ' + err);
			},
			() => {
				this.email = this.memberMiniDTO.email;
				this.memberName = this.memberMiniDTO.memberName;
			}
		);
	}

	resetMemberData() {
		console.log('memberLookup reset');
		this.memberSelected.notifyNewMemberGUId('0000');
		this.currentGUId = '0000';
	}

	search = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			tap((term) => console.log('search function has searchStr ' + term)),
			tap(() => (this.searching = true)),
			switchMap((term) =>
				this._service.search(term).pipe(
					tap(() => (this.searchFailed = false)),
					tap((x) => console.log(x[0].memberName)),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					})
				)
			),
			tap(() => (this.searching = false))
		);
	formatter = (x: { memberName: string; email: string }) => x.memberName + ' <' + x.email + '>';

	gotoMemberList() {
		const link = 'admins/members/memberList';
		this.router.navigateByUrl(link);
	}

	gotoCreateNewMember() {
		const link = 'admins/members/createNewMember';
		this.router.navigateByUrl(link);
	}

	gotoMember() {
		if (this.currentGUId !== '0000') {
			const link = [ 'admins/members/member', { guid: this.currentGUId } ];
			console.log('navigating to ' + link);
			this.router.navigate(link);
		}
	}
}
